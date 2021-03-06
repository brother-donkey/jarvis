import { CommanderStatic } from "commander";
import { DotenvConfigOutput } from "dotenv/types";
export interface IProgram extends CommanderStatic {
    xtremely: boolean;
    withFlags: string;
}
export interface IDotConfig extends DotenvConfigOutput {
    DEFAULT_AZURE_DEVOPS_REPO: string;
    DEFAULT_AZURE_DEVOPS_ORGANIZATION: string;
    DEFAULT_AZURE_DEVOPS_PROJECT: string;
    DEFAULT_AZURE_DEVOPS_TARGET: string;
    COMMENT: string;
    AZURE_DEVOPS_ENGINEERING_PROJECT_ID: string;
    AZURE_DEVOPS_WIKI: string;
    AZURE_DEVOPS_WIKI_TEAM_PAGE: string;
    CURRENT_FISCAL_QUARTER: string;
}
export interface IWikiePageResponse {
    eTag: string;
    page: Page;
}
export interface Page {
    content: string;
    gitItemPath: string;
    id: number;
    isNonConformant: null;
    isParentPage: boolean;
    order: number;
    path: string;
    remoteUrl: string;
    subPages: any[];
    url: string;
}
export declare type TTopLevelCommand = 'wiki' | 'pull-request';
export declare type TWikiSubCommand = 'list' | 'show-last' | 'next-week';
export declare type TPRSubCommand = 'create' | 'list';
export declare type ListWikiPagesResponse = WikiPageInfo[];
export interface WikiPageInfo {
    id: string;
    mappedPath: string;
    name: string;
    projectId: string;
    properties: null;
    remoteUrl: string;
    repositoryId: string;
    type: string;
    url: string;
    versions: Version[];
}
export interface Version {
    version: string;
    versionOptions: null;
    versionType: null;
}
export interface WikiPageCreateResponse {
    eTag: string;
    page: Page;
}
export interface WikiPage {
    content: string;
    gitItemPath: string;
    id: number;
    isNonConformant: true | null;
    isParentPage: true | null;
    order: number;
    path: string;
    remoteUrl: string;
    subPages: any[];
    url: string;
}
export interface ShowPageResponse {
    eTag: string;
    page: Page;
}
export interface ShowPagePage {
    content: string;
    gitItemPath: string;
    id: number;
    isNonConformant: boolean | null;
    isParentPage: boolean | null;
    order: number;
    path: string;
    remoteUrl: string;
    subPages: any[];
    url: string;
}
export interface BoardsQueryResponse {
    fields: Fields;
    id: number;
    relations: null;
    rev: number;
    url: string;
}
export interface Fields {
    "System.AssignedTo"?: SystemAssignedTo;
    "System.Id": number;
    "System.State": string;
    "System.Tags": string;
    "System.Title": string;
    "System.WorkItemType": SystemWorkItemType;
}
export interface SystemAssignedTo {
    _links: Links;
    descriptor: string;
    displayName: string;
    id: string;
    imageUrl: string;
    uniqueName: string;
    url: string;
}
export interface Links {
    avatar: Avatar;
}
export interface Avatar {
    href: string;
}
export declare enum SystemWorkItemType {
    DevTask = "Dev Task",
    Feature = "Feature"
}
