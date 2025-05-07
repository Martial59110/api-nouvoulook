import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient } from '../prisma/generated';

@Injectable()
export class StatisticsService {
  private prisma: PrismaClient;

  constructor(private prismaService: PrismaService) {
    this.prisma = prismaService as unknown as PrismaClient;
  }

  async recordPageView(path: string, ipAddress?: string, userAgent?: string) {
    return this.prisma.pageView.create({
      data: {
        path,
        ipAddress,
        userAgent,
      },
    });
  }

  async getTotalViews() {
    return this.prisma.pageView.count();
  }

  async getDailyViews() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.prisma.pageView.count({
      where: {
        createdAt: {
          gte: today,
        },
      },
    });
  }

  async getWeeklyViews() {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    return this.prisma.pageView.count({
      where: {
        createdAt: {
          gte: weekAgo,
        },
      },
    });
  }

  async getMonthlyViews() {
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    return this.prisma.pageView.count({
      where: {
        createdAt: {
          gte: monthAgo,
        },
      },
    });
  }

  async getYearlyViews() {
    const yearAgo = new Date();
    yearAgo.setFullYear(yearAgo.getFullYear() - 1);

    return this.prisma.pageView.count({
      where: {
        createdAt: {
          gte: yearAgo,
        },
      },
    });
  }
} 