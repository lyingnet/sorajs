import { getRootData } from '@sapphire/pieces';
import { join } from 'node:path';
import { envParseString } from '@skyra/env-utilities';
export const mainFolder = getRootData().root;
export const rootFolder = join(mainFolder, '..');
export const assetsFolder = join(rootFolder, 'assets');
export const socialFolder = join(assetsFolder, 'images', 'social');
export function parsePresenceActivity() {
    const { CLIENT_PRESENCE_NAME  } = process.env;
    if (!CLIENT_PRESENCE_NAME) return [];
    return [
        {
            name: CLIENT_PRESENCE_NAME,
            type: envParseString('CLIENT_PRESENCE_TYPE', 'LISTENING')
        }
    ];
}
