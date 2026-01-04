import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

Schema({ _id: false })
export class CircleMember {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    name: string;

    @Prop([String])
    targetLanguages?: string[];

    @Prop({default: false})
    isMentor: boolean;

    @Prop([String])
    mastered_languages?: string[];

    @Prop()
    native?: boolean;

    @Prop()
    certification?: string;

    @Prop()
    learning_language?: string;
}

export const CircleMemberSchema = SchemaFactory.createForClass(CircleMember);