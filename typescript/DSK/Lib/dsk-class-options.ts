import { IFrameNavOptions } from "dsk-options";





export class FrameNavOptions implements IFrameNavOptions {
    csslinks?: string[] | undefined;
    header?: string | undefined;
    title !: string;
    description?: string | undefined;
    content !: string;

}