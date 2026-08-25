/**
 * Notification Service Integration Adapter
 * Dispatches citizen updates via SMS/Email without logging sensitive PII.
 */

export interface NotificationParams {
  maskedUan: string;
  recipientHash?: string;
  templateId: "CLAIM_RESUBMITTED" | "CLAIM_STATUS_UPDATE" | "SUPPORT_CASE_CREATED";
  templateVariables: Record<string, string>;
}

export class NotificationClient {
  async sendNotification(params: NotificationParams): Promise<{ success: boolean; messageId?: string }> {
    if (process.env.NOTIFICATION_API_URL && process.env.NOTIFICATION_API_KEY) {
      try {
        const res = await fetch(`${process.env.NOTIFICATION_API_URL}/send`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NOTIFICATION_API_KEY}`,
          },
          body: JSON.stringify(params),
        });
        const data = await res.json();
        return { success: res.ok, messageId: data.id };
      } catch (err) {
        console.error("[NotificationClient] Failed to dispatch notification:", err);
        return { success: false };
      }
    }

    // Local / staging mock log
    if (process.env.NODE_ENV !== "production") {
      console.info(`[NotificationClient:DEMO] Dispatched ${params.templateId} for UAN ${params.maskedUan}`);
    }
    return { success: true, messageId: `msg_${Date.now()}` };
  }
}

export const notificationClient = new NotificationClient();
