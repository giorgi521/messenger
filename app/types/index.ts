import {
    Conversation,Message,User
} from '@prisma/client';

export type fullMessageType = Message & {
    sender: User,
    seen:User[]
}

export type fullCoverstationType = Conversation & {
    users: User[],
    messages: fullMessageType[]
}