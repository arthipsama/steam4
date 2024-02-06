import { userData } from "./user.models";

export interface ContactMeDTO {
    contactmeid: number;
    userid?: number | null;
    textname: string;
    email?: string;
    read?: boolean;
    subject: string;
    textmessage: string;
    user?: userData;
    CreateBy?: string;
    CreateDate?: Date;
    UpdateBy?: string;
    UpdateDate?: Date | null;
  }