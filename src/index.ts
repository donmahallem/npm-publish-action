import * as github from '@actions/github';
import * as actionscore from '@actions/core';
import { writeFileSync } from 'fs';
import { Config } from './config';

const config: Config = {
    TARGET: actionscore.getInput("target", {
        required: false
    }),
    GITHUB_SECRET: actionscore.getInput("github_secret", {
        required: false
    }),
    NPM_SECRET: actionscore.getInput("npm_secret", {
        required: false
    })
};
const writeFile = (file: string, data: string) => {
    return writeFileSync(file, data, { encoding: "utf-8" });
}
const setupNpmrcFile = (domain: string, user: string, secret: string) => {
    const data: string = "//" + domain + "/:_authToken=" + secret
        + "\nregistry=https://" + domain + "/" + user;
}
const deployToGithub = (config: Config) => {
    actionscore.info('Deploying to Github');
    if (config.NPM_SECRET === false) {
        actionscore.setFailed('Github Secret required');
        return;
    }
}
const deployToNpmjs = (config: Config) => {
    actionscore.info('Deploying to NPMJS');
    if (config.NPM_SECRET === false) {
        actionscore.setFailed('NPM Secret required');
        return;
    }
}
async function runa(config: Config) {
    switch (config.TARGET) {
        case 'npmjs':
            deployToNpmjs(config);
            break;
        case 'github':
            deployToGithub(config);
            break;
        default:
            actionscore.setFailed("Target required!");
            break;
    }
}

runa(config).catch((err) => {
    console.error(err);
    actionscore.setFailed("Error");
}).then(() => {
    actionscore.info("Success");
})