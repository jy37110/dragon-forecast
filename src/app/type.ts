import { Forecast } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export type FullEvent = {
  id: number;
  name: string;
  category: string;
  balance: Decimal;
  debt: Decimal;
  forecast: Forecast;
  last_topup: Decimal | null;
  last_topup_at: Date | null;
  last_widthdraw: Decimal | null;
  last_widthdraw_at: Date | null;
  update_at: Date;
  action: string;
  amount: Decimal;
  create_at: Date;
  user: string;
  comments: string | null;
  forecast_id: number;
};

export type GroupedForecast = {
  category: string;
  forecasts: Forecast[];
  forecastSum: number;
  percentage: number;
};
