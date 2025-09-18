import { Plugin } from 'ckeditor5';
export interface StrapiMediaLibPlugin extends Plugin {
    connect: (strapiToggle: () => void) => void;
}
export declare class StrapiMediaLib extends Plugin implements StrapiMediaLibPlugin {
    /**
     * Strapi function used to show media library modal.
     * Should be provided via connect method before using toggle method.
     */
    private strapiToggle;
    static get pluginName(): "StrapiMediaLib";
    init(): void;
    connect(strapiToggle: () => void): void;
    toggle(): void;
}
