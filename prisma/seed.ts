import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  // =====================
  // CASINOS
  // =====================
  {
    name: 'Online Casinos',
    slug: 'online-casino',
  },
  {
    name: 'Real Money Casinos',
    slug: 'real-money-casinos',
  },
  {
    name: 'Crypto Casinos',
    slug: 'crypto-casinos',
  },
  {
    name: 'Mobile Casinos',
    slug: 'mobile-casinos',
  },
  {
    name: 'Instant Play Casinos',
    slug: 'instant-play-casinos',
  },
  {
    name: 'Sweepstakes Casinos',
    slug: 'sweepstakes-casinos',
  },
  {
    name: 'Pay N Play Casinos',
    slug: 'pay-n-play-casinos',
  },
  {
    name: 'Newest Casinos',
    slug: 'newest-casino',
  },
  {
    name: 'Certified Casinos',
    slug: 'certified-casino',
  },
  {
    name: 'Casino Companies',
    slug: 'casino-companies',
  },
  {
    name: 'Fast Withdrawal Casinos',
    slug: 'fast-withdrawal-casinos',
  },
  {
    name: 'Best Payout Casinos',
    slug: 'best-payout-casinos',
  },
  {
    name: 'Low Deposit Casinos',
    slug: 'low-deposit-casinos',
  },
  {
    name: 'No Deposit Casinos',
    slug: 'no-deposit-casinos',
  },
  {
    name: 'High Roller Casinos',
    slug: 'high-roller-casinos',
  },
  {
    name: 'Live Dealer Casinos',
    slug: 'live-dealer-casinos',
  },
  {
    name: 'Licensed Casinos',
    slug: 'licensed-casinos',
  },
  {
    name: 'Trusted Casinos',
    slug: 'trusted-casinos',
  },
  {
    name: 'Casinos by Country',
    slug: 'casinos-by-country',
  },
  {
    name: 'Casinos by Deposit Method',
    slug: 'casinos-by-deposit-method',
  },
  {
    name: 'Casinos by Game Provider',
    slug: 'casinos-by-game-provider',
  },
  {
    name: 'Casinos by License',
    slug: 'casinos-by-license',
  },

  // =====================
  // BONUSES
  // =====================
  {
    name: 'Casino Bonuses',
    slug: 'casino-bonuses',
  },
  {
    name: 'Latest Bonuses',
    slug: 'latest-bonuses',
  },
  {
    name: 'Exclusive Bonuses',
    slug: 'exclusive-bonuses',
  },
  {
    name: 'Bonuses by Country',
    slug: 'bonuses-by-country',
  },
  {
    name: 'Welcome Bonuses',
    slug: 'welcome-bonuses',
  },
  {
    name: 'No Deposit Bonuses',
    slug: 'no-deposit-bonuses',
  },
  {
    name: 'Free Spins Bonuses',
    slug: 'free-spins-bonuses',
  },
  {
    name: 'Deposit Bonuses',
    slug: 'deposit-bonuses',
  },
  {
    name: 'Match Deposit Bonuses',
    slug: 'match-deposit-bonuses',
  },
  {
    name: 'Minimum Deposit Bonuses',
    slug: 'minimum-deposit-bonuses',
  },
  {
    name: 'Cashback Bonuses',
    slug: 'cashback-bonuses',
  },
  {
    name: 'Reload Bonuses',
    slug: 'reload-bonuses',
  },
  {
    name: 'High Roller Bonuses',
    slug: 'high-roller-bonuses',
  },
  {
    name: 'Crypto Bonuses',
    slug: 'crypto-bonuses',
  },
  {
    name: 'Sweepstakes Bonuses',
    slug: 'sweepstakes-bonuses',
  },
  {
    name: 'No Wagering Bonuses',
    slug: 'no-wagering-bonuses',
  },
  {
    name: 'VIP Bonuses',
    slug: 'vip-bonuses',
  },
  {
    name: 'Referral Bonuses',
    slug: 'referral-bonuses',
  },
  {
    name: 'Loyalty Bonuses',
    slug: 'loyalty-bonuses',
  },
  {
    name: 'Daily Bonuses',
    slug: 'daily-bonuses',
  },
  {
    name: 'Weekly Bonuses',
    slug: 'weekly-bonuses',
  },
  {
    name: 'Weekend Bonuses',
    slug: 'weekend-bonuses',
  },
  {
    name: 'Birthday Bonuses',
    slug: 'birthday-bonuses',
  },
  {
    name: 'Tournament Bonuses',
    slug: 'tournament-bonuses',
  },
  {
    name: 'Referral Friend Bonuses',
    slug: 'refer-a-friend-bonuses',
  },

  // =====================
  // GAMES
  // =====================
  {
    name: 'Casino Games',
    slug: 'casino-games',
  },
  {
    name: 'Table Games',
    slug: 'table-games',
  },
  {
    name: 'Card Games',
    slug: 'card-games',
  },
  {
    name: 'Dice Games',
    slug: 'dice-games',
  },
  {
    name: 'Poker Games',
    slug: 'poker-games',
  },
  {
    name: 'Blackjack Games',
    slug: 'blackjack-games',
  },
  {
    name: 'Roulette Games',
    slug: 'roulette-games',
  },
  {
    name: 'Craps Games',
    slug: 'craps-games',
  },
  {
    name: 'Bingo Games',
    slug: 'bingo-games',
  },
  {
    name: 'Baccarat Games',
    slug: 'baccarat-games',
  },
  {
    name: 'Lottery Games',
    slug: 'lottery-games',
  },
  {
    name: 'Real Money Games',
    slug: 'real-money-games',
  },
  {
    name: 'Free Slot Tournaments',
    slug: 'free-slot-tournaments',
  },

  // =====================
  // SLOTS
  // =====================
  {
    name: 'Video Slots',
    slug: 'video-slots',
  },
  {
    name: 'Classic Slots',
    slug: 'classic-slots',
  },
  {
    name: 'Progressive Slots',
    slug: 'progressive-slots',
  },
  {
    name: 'New Slots',
    slug: 'new-slots',
  },

  // =====================
  // BETTING
  // =====================
  {
    name: 'Sports Betting',
    slug: 'sports-betting',
  },
  {
    name: 'Betting Tips',
    slug: 'betting-tips',
  },
  {
    name: 'Sportsbook Reviews',
    slug: 'sportsbook-reviews',
  },
  {
    name: 'New Betting Sites',
    slug: 'new-betting-sites',
  },
  {
    name: 'Live Scores',
    slug: 'live-scores',
  },
  {
    name: 'Popular Competitions',
    slug: 'popular-competitions',
  },
  {
    name: 'World Cup 2026',
    slug: 'world-cup-2026',
  },
  {
    name: 'Bet Types',
    slug: 'bet-types',
  },
  {
    name: 'Betting Features',
    slug: 'betting-features',
  },
  {
    name: 'Odds Forums',
    slug: 'odds-forums',
  },
  {
    name: 'Betting by Country',
    slug: 'betting-by-country',
  },
  {
    name: 'Deposit Methods',
    slug: 'deposit-methods',
  },
  {
    name: 'Betting Bonuses',
    slug: 'betting-bonuses',
  },
  {
    name: 'Welcome Bonuses',
    slug: 'betting-welcome-bonuses',
  },
  {
    name: 'Free Bonuses',
    slug: 'free-bonuses',
  },
  {
    name: 'Betting Bonuses by Country',
    slug: 'betting-bonuses-by-country',
  },
  {
    name: 'Prediction Markets',
    slug: 'prediction-markets',
  },
  {
    name: 'Odds Calculator',
    slug: 'odds-calculator',
  },
];

async function main() {
  console.log('Seeding categories...');

  for (const category of categories) {
    await prisma.casinoCategory.upsert({
      where: {
        slug: category.slug,
      },
      update: {
        name: category.name,
      },
      create: {
        name: category.name,
        slug: category.slug,
      },
    });
  }

  console.log(
    `Successfully seeded ${categories.length} categories.`,
  );
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });