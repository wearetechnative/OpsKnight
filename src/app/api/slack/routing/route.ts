import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { assertAdmin } from '@/lib/rbac';
import { logger } from '@/lib/logger';

function optionalChannel(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const channel = value.trim().replace(/^#/, '');
  return channel.length > 0 ? channel.slice(0, 200) : null;
}

export async function PATCH(request: NextRequest) {
  try {
    await assertAdmin();
    const body = await request.json();
    const productionChannel = optionalChannel(body?.productionChannel);
    const nonProductionChannel = optionalChannel(body?.nonProductionChannel);

    if (productionChannel && productionChannel === nonProductionChannel) {
      return NextResponse.json(
        { error: 'Production and non-production must use different channels.' },
        { status: 400 }
      );
    }

    const integration = await prisma.slackIntegration.findFirst({
      where: { enabled: true, service: null },
      orderBy: { updatedAt: 'desc' },
      select: { id: true },
    });
    if (!integration) {
      return NextResponse.json({ error: 'Global Slack integration not found.' }, { status: 404 });
    }

    await prisma.slackIntegration.update({
      where: { id: integration.id },
      data: { productionChannel, nonProductionChannel },
    });

    return NextResponse.json({ ok: true, productionChannel, nonProductionChannel });
  } catch (error) {
    logger.error('[Slack] Failed to save environment routing', {
      error: error instanceof Error ? error.message : String(error),
    });
    const unauthorized = error instanceof Error && error.message.startsWith('Unauthorized');
    return NextResponse.json(
      { error: unauthorized ? error.message : 'Internal server error' },
      { status: unauthorized ? 403 : 500 }
    );
  }
}
