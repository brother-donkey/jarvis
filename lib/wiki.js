#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var shell = __importStar(require("shelljs"));
var time_1 = require("./time");
var chalk = require("chalk");
var jarvis_says_1 = require("./jarvis-says");
var fs_1 = require("fs");
/**
 * Load enviroment from .env
 */
function wiki(program, env) {
    var _this = this;
    program
        .version('0.0.1')
        .command('wiki <action>')
        .description('create or manage a devops wiki')
        .action(function (arg, opt, cmdLine) { return __awaiter(_this, void 0, void 0, function () {
        var command, subcommand, nw_1, existingFYPageContent_1, templateFilePath_1;
        return __generator(this, function (_a) {
            command = 'wiki';
            subcommand = arg || 'list' || 'show-last' || 'next-week';
            console.log('Getting a list of wikis');
            switch (arg) {
                case 'list':
                    shell.exec(["az devops wiki list",
                        "--organization=\"" + env.DEFAULT_AZURE_DEVOPS_ORGANIZATION + "\"",
                        "--project=\"" + env.AZURE_DEVOPS_ENGINEERING_PROJECT_ID + "\"",
                    ].join(' '), function (code, output) {
                        var response = JSON.parse(output);
                        var responseNames = response.map(function (wiki) { return wiki.name; });
                        jarvis_says_1.jarvisSays();
                        console.log(chalk.blueBright(responseNames.join('\n')));
                    });
                    return [2 /*return*/];
                    break;
                case undefined:
                    program.outputHelp();
                case 'show-last':
                    shell.exec(["az devops wiki page show",
                        "--organization=\"" + env.DEFAULT_AZURE_DEVOPS_ORGANIZATION + "\"",
                        "--project=\"" + env.AZURE_DEVOPS_ENGINEERING_PROJECT_ID + "\"",
                        "--path=\"" + env.AZURE_DEVOPS_WIKI_TEAM_PAGE + "/" + time_1.getFiscalPointer(new Date()) + "\"",
                        "--wiki=\"" + env.AZURE_DEVOPS_WIKI + "\""
                    ].join(' '), function (code, output) {
                        console.log('Code', code);
                        console.log('Output', output);
                    });
                    return [2 /*return*/];
                case 'next-week':
                    nw_1 = time_1.createNextWeeksWikiName();
                    existingFYPageContent_1 = function (content) { return content ? content : ''; };
                    templateFilePath_1 = './FYTemplate.md';
                    shell.exec(["az devops wiki page show",
                        "--organization=\"" + env.DEFAULT_AZURE_DEVOPS_ORGANIZATION + "\"",
                        "--project=\"" + env.AZURE_DEVOPS_ENGINEERING_PROJECT_ID + "\"",
                        "--path=\"" + env.AZURE_DEVOPS_WIKI_TEAM_PAGE + "/" + nw_1.parentPage + "\"",
                        "--wiki=\"" + env.AZURE_DEVOPS_WIKI + "\"",
                        "--include-content"
                    ].join(' '), function (code, output) {
                        var response = null;
                        try {
                            response = JSON.parse(output);
                        }
                        catch (_a) {
                            jarvis_says_1.jarvisLogs('No Fiscal Year page, creating one');
                        }
                        if (!response) {
                            var newContent = existingFYPageContent_1() + "\n- [" + nw_1.wikiName + "](https://dev.azure.com/ceapex/Engineering/_wiki/wikis/Engineering.wiki/" + nw_1.parentPage + nw_1.wikiName + ")";
                            fs_1.writeFileSync(templateFilePath_1, newContent);
                            response = createNewFiscalYearPage(env, nw_1, templateFilePath_1, response, function () { return createNewWeekPage(env, nw_1); });
                        }
                        else {
                            var eTag = response.eTag, content = response.page.content;
                            var updatedContent = existingFYPageContent_1(content) + "\n- [" + nw_1.wikiName + "](https://dev.azure.com/ceapex/Engineering/_wiki/wikis/Engineering.wiki/" + nw_1.parentPage + "/" + nw_1.wikiName + ")";
                            fs_1.writeFileSync(templateFilePath_1, updatedContent);
                            updateFiscalYearPage(env, nw_1, eTag, templateFilePath_1, function () { return createNewWeekPage(env, nw_1); });
                        }
                    });
                    break;
                default:
                    break;
            }
            return [2 /*return*/];
        });
    }); });
}
exports.wiki = wiki;
function updateFiscalYearPage(env, nw, eTag, templateFilePath, cb) {
    if (cb === void 0) { cb = function () { }; }
    shell.exec(["az devops wiki page update",
        "--organization=\"" + env.DEFAULT_AZURE_DEVOPS_ORGANIZATION + "\"",
        "--project=\"" + env.AZURE_DEVOPS_ENGINEERING_PROJECT_ID + "\"",
        "--path=\"" + env.AZURE_DEVOPS_WIKI_TEAM_PAGE + "/" + nw.parentPage + "\"",
        "--wiki=\"" + env.AZURE_DEVOPS_WIKI + "\"",
        "--version=\"" + eTag + "\"",
        "--file-path=\"" + templateFilePath + "\"",
    ].join(' '), function (code, output) {
        jarvis_says_1.jarvisLogs(chalk.white('Updated wiki page with new link'));
        cb();
    });
}
function createNewFiscalYearPage(env, nw, templateFilePath, response, cb) {
    if (cb === void 0) { cb = function () { }; }
    shell.exec(["az devops wiki page create",
        "--organization=\"" + env.DEFAULT_AZURE_DEVOPS_ORGANIZATION + "\"",
        "--project=\"" + env.AZURE_DEVOPS_ENGINEERING_PROJECT_ID + "\"",
        "--path=\"" + env.AZURE_DEVOPS_WIKI_TEAM_PAGE + "/" + nw.parentPage + "\"",
        "--wiki=\"" + env.AZURE_DEVOPS_WIKI + "\"",
        "--file-path=\"" + templateFilePath + "\"",
    ].join(' '), function (code, output) {
        response = JSON.parse(output);
        jarvis_says_1.jarvisLogs([
            'Created Fiscal Year page',
            chalk.greenBright(response.page.remoteUrl),
            env.AZURE_DEVOPS_WIKI_TEAM_PAGE + "/" + nw.parentPage
        ]);
        cb();
    });
    return response;
}
function createNewWeekPage(env, nw, cb) {
    if (cb === void 0) { cb = function () { }; }
    shell.exec(["az devops wiki page create",
        "--organization=\"" + env.DEFAULT_AZURE_DEVOPS_ORGANIZATION + "\"",
        "--project=\"" + env.AZURE_DEVOPS_ENGINEERING_PROJECT_ID + "\"",
        "--path=\"" + env.AZURE_DEVOPS_WIKI_TEAM_PAGE + "/" + nw.parentPage + "/" + nw.wikiName + "\"",
        "--wiki=\"" + env.AZURE_DEVOPS_WIKI + "\"",
        "--content=\"content\""
    ].join(' '), function (code, output) {
        var response = null;
        try {
            response = JSON.parse(output);
        }
        catch (_a) {
            jarvis_says_1.jarvisSays();
            jarvis_says_1.jarvisLogs([
                'Error Page already exists.',
            ]);
            return;
        }
        var page = response.page;
        jarvis_says_1.jarvisSays();
        jarvis_says_1.jarvisLogs([
            'Page created: ',
            chalk.greenBright(page.remoteUrl),
            env.AZURE_DEVOPS_WIKI_TEAM_PAGE + "/" + nw.parentPage + "/" + nw.wikiName
        ]);
        cb();
    });
}
