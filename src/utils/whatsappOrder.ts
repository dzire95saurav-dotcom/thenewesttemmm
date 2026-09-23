import { whatsappConfig } from '@/config/whatsapp';
import { restaurantInfo } from '@/data/restaurant';
import type { CartItem } from '@/types';

export function buildWhatsAppUrl(items: CartItem[], total: number, itemCount: number, table: number): string {
  const lines: string[] = [];

  lines.push('NEW ORDER — POPULAR DINEOUT');
  lines.push('');
  lines.push(`Table: ${table}`);
  lines.push('');
  lines.push('ORDER:');

  for (const item of items) {
    const subtotal = item.price * item.quantity;
    lines.push(`\u2022 ${item.name} \u00D7 ${item.quantity} \u2014 \u20B9${subtotal}`);
  }

  lines.push('');
  lines.push(`TOTAL ITEMS: ${itemCount}`);
  lines.push(`TOTAL: \u20B9${total}`);
  lines.push('');
  lines.push(`Please prepare the order for Table ${table}.`);

  const message = lines.join('\n');
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${whatsappConfig.number}?text=${encodedMessage}`;
}

export function buildRestaurantLabel(): string {
  return restaurantInfo.name;
}
