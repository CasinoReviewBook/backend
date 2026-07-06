import { Request, Response } from 'express';
import { prisma } from '../prisma';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

// Allowed file types and size limits
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB

// Generate unique filename
const generateFileName = (originalName: string, folder: string): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const ext = path.extname(originalName);
  const baseName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
  return `${folder}/${baseName}_${timestamp}_${random}${ext}`;
};

// Validate file
const validateFile = (file: any, folder: string): { valid: boolean; error?: string } => {
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  const isImage = ALLOWED_IMAGE_TYPES.includes(file.mimetype);
  const isVideo = ALLOWED_VIDEO_TYPES.includes(file.mimetype);

  if (!isImage && !isVideo) {
    return { valid: false, error: 'Invalid file type. Only images and videos are allowed.' };
  }

  if (isImage && file.size > MAX_IMAGE_SIZE) {
    return { valid: false, error: 'Image size exceeds 10MB limit.' };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'File size exceeds 50MB limit.' };
  }

  return { valid: true };
};

export const uploadMedia = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const folder = req.body.folder || 'general';
    const uploadedBy = req.body.uploaded_by || null;

    // Validate file
    const validation = validateFile(req.file, folder);
    if (!validation.valid) {
      res.status(400).json({ error: validation.error });
      return;
    }

    // Generate file paths
    const fileName = generateFileName(req.file.originalname, folder);
    const filePath = path.join(process.cwd(), 'uploads', fileName);
    const fileUrl = `/uploads/${fileName}`;

    // Ensure directory exists
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });

    // Save file
    await fs.writeFile(filePath, req.file.buffer);

    // Get image dimensions if it's an image
    let width: number | null = null;
    let height: number | null = null;

    if (ALLOWED_IMAGE_TYPES.includes(req.file.mimetype)) {
      try {
        const metadata = await sharp(req.file.buffer).metadata();
        width = metadata.width || null;
        height = metadata.height || null;
      } catch (err) {
        console.error('Error getting image dimensions:', err);
      }
    }

    // Determine file type
    const fileType = ALLOWED_IMAGE_TYPES.includes(req.file.mimetype) ? 'image' : 'video';

    // Create media record
    const media = await prisma.mediaLibrary.create({
      data: {
        file_name: fileName,
        original_name: req.file.originalname,
        file_url: fileUrl,
        file_type: fileType,
        mime_type: req.file.mimetype,
        file_size: BigInt(req.file.size),
        width,
        height,
        folder,
        uploaded_by: uploadedBy,
      },
      include: {
        uploader: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Convert BigInt to Number for JSON serialization
    const serializedMedia = {
      ...media,
      file_size: Number(media.file_size),
    };

    res.status(201).json(serializedMedia);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMedia = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, type, folder, sort = 'newest' } = req.query;

    const where: any = {};

    if (search) {
      where.OR = [
        { file_name: { contains: String(search), mode: 'insensitive' } },
        { original_name: { contains: String(search), mode: 'insensitive' } },
      ];
    }

    if (type) {
      where.file_type = String(type);
    }

    if (folder) {
      where.folder = String(folder);
    }

    const orderBy: any = {};
    if (sort === 'oldest') {
      orderBy.created_at = 'asc';
    } else if (sort === 'file_size') {
      orderBy.file_size = 'desc';
    } else if (sort === 'file_name') {
      orderBy.file_name = 'asc';
    } else {
      orderBy.created_at = 'desc';
    }

    const media = await prisma.mediaLibrary.findMany({
      where,
      include: {
        uploader: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy,
    });

    // Convert BigInt to Number for JSON serialization
    const serializedMedia = media.map(m => ({
      ...m,
      file_size: Number(m.file_size),
    }));

    res.json(serializedMedia);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMediaById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const media = await prisma.mediaLibrary.findUnique({
      where: { id },
      include: {
        uploader: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    if (!media) {
      res.status(404).json({ error: 'Media not found' });
      return;
    }
    
    // Convert BigInt to Number for JSON serialization
    const serializedMedia = {
      ...media,
      file_size: Number(media.file_size),
    };
    
    res.json(serializedMedia);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateMedia = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { original_name, folder } = req.body;

    const media = await prisma.mediaLibrary.update({
      where: { id },
      data: {
        ...(original_name && { original_name }),
        ...(folder && { folder }),
      },
    });

    // Convert BigInt to Number for JSON serialization
    const serializedMedia = {
      ...media,
      file_size: Number(media.file_size),
    };

    res.json(serializedMedia);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteMedia = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);

    // Get media info to delete file
    const media = await prisma.mediaLibrary.findUnique({ where: { id } });
    if (!media) {
      res.status(404).json({ error: 'Media not found' });
      return;
    }

    // Delete file from disk
    const filePath = path.join(process.cwd(), 'uploads', media.file_name || '');
    try {
      await fs.unlink(filePath);
    } catch (err) {
      console.error('Error deleting file:', err);
    }

    // Delete from database
    await prisma.mediaLibrary.delete({ where: { id } });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
