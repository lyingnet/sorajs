import { getRootData } from '@sapphire/pieces';
import type { ActivitiesOptions, ExcludeEnum } from 'discord.js';
import { join } from 'node:path';
import { envParseString } from '@skyra/env-utilities';
import type { ActivityTypes } from 'discord.js/typings/enums';

export const mainFolder = getRootData().root;
export const rootFolder = join(mainFolder, '..');
export const assetsFolder = join(rootFolder, 'assets');
export const socialFolder = join(assetsFolder, 'images', 'social');

export function parsePresenceActivity(): ActivitiesOptions[] {
    const { CLIENT_PRESENCE_NAME } = process.env;
    if (!CLIENT_PRESENCE_NAME) return [];
  
    return [
      {
        name: CLIENT_PRESENCE_NAME,
        type: envParseString('CLIENT_PRESENCE_TYPE', 'LISTENING') as ExcludeEnum<typeof ActivityTypes, 'CUSTOM'>
      }
    ];
  }