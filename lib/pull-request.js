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
var inquirer = __importStar(require("inquirer"));
var shell = __importStar(require("shelljs"));
var pr_prompts_1 = require("./prompts/pr-prompts");
function pullRequest(program, env) {
    var _this = this;
    program
        .version('0.0.1')
        .command('pr')
        .description('create a new pull request')
        .action(function (arg, opt, cmdLine) { return __awaiter(_this, void 0, void 0, function () {
        var prPrompt, command, answers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    prPrompt = inquirer.createPromptModule();
                    command = 'pull-request';
                    return [4 /*yield*/, prPrompt(pr_prompts_1.createPullRequestQuestions(env))];
                case 1:
                    answers = _a.sent();
                    console.log('Creating your pull request');
                    shell.exec(["az repos pr create",
                        "--organization=\"" + env.DEFAULT_AZURE_DEVOPS_ORGANIZATION + "\"",
                        "--project=\"" + env.AZURE_DEVOPS_ENGINEERING_PROJECT_ID + "\"",
                        "--repository=\"" + env.DEFAULT_AZURE_DEVOPS_REPO + "\"",
                        "--title=\"" + answers.prName + "\"",
                        "--description=\"" + answers.prDescription + "\"",
                        "--draft=\"true\"",
                        "--target-branch \"" + (answers.targetBranch || env.DEFAULT_AZURE_DEVOPS_PROJECT) + "\"",
                        "--source-branch=\"" + answers.sourceBranch + "\"",
                        "--open"].join(' '), function (code, output) {
                        console.log('Code', code);
                        console.log('Output', output);
                    });
                    return [2 /*return*/];
            }
        });
    }); });
}
exports.pullRequest = pullRequest;
