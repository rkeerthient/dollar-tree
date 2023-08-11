export interface DirectoryItem {
  name: string;
  slug: string;
  dm_directoryChildren?: DirectoryItem[];
}
