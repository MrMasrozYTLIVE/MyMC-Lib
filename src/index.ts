// @ts-ignore
import unirest from "unirest";

export default class MyMCLib {
    private readonly token: string;

    constructor(token: string | undefined) {
        this.token = token ? token : "";

        this.verifyToken().then(r => {
            if(!r.success) throw new Error(r.message);
        });
    }

    private async verifyToken() {
        return await ApiUtils.getRequest(ApiEndpoint.HELLO, this.token);
    }

    public async getTime() {
        return await ApiUtils.getRequest(ApiEndpoint.TIME, this.token);
    }

    public async getStats() {
        return await ApiUtils.getRequest(ApiEndpoint.STATS, this.token);
    }

    public async getLog() {
        return await ApiUtils.getRequest(ApiEndpoint.LOG, this.token);
    }

    public async startServer() {
        return await ApiUtils.getRequest(ApiEndpoint.START, this.token);
    }

    public async stopServer() {
        return await ApiUtils.getRequest(ApiEndpoint.STOP, this.token);
    }

    public async restartServer() {
        return await ApiUtils.getRequest(ApiEndpoint.RESTART, this.token);
    }

    public async createMyLink() {
        return await ApiUtils.getRequest(ApiEndpoint.MY_LINK, this.token);
    }

    public async deleteMyLink() {
        return await ApiUtils.deleteRequest(ApiEndpoint.MY_LINK, this.token);
    }

    public async createLinkSFTP() {
        return await ApiUtils.getRequest(ApiEndpoint.MY_SFTP, this.token);
    }

    public async deleteLinkSFTP() {
        return await ApiUtils.deleteRequest(ApiEndpoint.MY_SFTP, this.token);
    }

    public async getConnectionHash() {
        return await ApiUtils.getRequest(ApiEndpoint.MY_HASH, this.token);
    }

    public async getConnectionHashSFTP() {
        return await ApiUtils.getRequest(ApiEndpoint.MY_HASH_SFTP, this.token);
    }

    public async getOnlinePlayers() {
        return await ApiUtils.getRequest(ApiEndpoint.LIST_PLAYERS, this.token);
    }

    public async getWebsiteURL() {
        return await ApiUtils.getRequest(ApiEndpoint.WEBSITE, this.token);
    }

    public async getMapURL() {
        return await ApiUtils.getRequest(ApiEndpoint.MAP, this.token);
    }

    public async postBan(username: string) {
        return await ApiUtils.postRequest(ApiEndpoint.BAN, this.token, {"username": username});
    }

    public async postUnban(username: string) {
        return await ApiUtils.postRequest(ApiEndpoint.UNBAN, this.token, {"username": username});
    }

    public async postSay(message: string) {
        return await ApiUtils.postRequest(ApiEndpoint.SAY, this.token, {"message": message});
    }

    public async postTell(username: string, message: string) {
        return await ApiUtils.postRequest(ApiEndpoint.TELL, this.token, {"username": username, "message": message});
    }

    public async postConsole(command: string) {
        return await ApiUtils.postRequest(ApiEndpoint.CONSOLE, this.token, {"command": command});
    }

    public async postGive(username: string, item: string, amount: number) {
        return await ApiUtils.postRequest(ApiEndpoint.GIVE, this.token, {"username": username, "item": item, "amount": amount});
    }

    public async installMod(modID: string) {
        return await ApiUtils.postRequest(ApiEndpoint.INSTALL, this.token, {"mod": modID});
    }

    public async uninstallMod(modID: string) {
        return await ApiUtils.postRequest(ApiEndpoint.UNINSTALL, this.token, {"mod": modID});
    }

    public async getInstalledMods() {
        return await ApiUtils.getRequest(ApiEndpoint.MOD_LIST, this.token);
    }
}

export class ApiUtils {
    static getRequest(endpoint: ApiEndpoint, token: string) {
        return new Promise<any>((resolve, reject) => {
            unirest
                .get('https://api.my-mc.link/' + endpoint)
                .headers({'Accept': 'application/json', 'Content-Type': 'application/json', 'x-my-mc-auth': token})
                .then((response: any) => {
                    resolve(response.body);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    static deleteRequest(endpoint: ApiEndpoint, token: string) {
        return new Promise<any>((resolve, reject) => {
            unirest
                .delete('https://api.my-mc.link/' + endpoint)
                .headers({'Accept': 'application/json', 'Content-Type': 'application/json', 'x-my-mc-auth': token})
                .then((response: any) => {
                    resolve(response.body);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    static async postRequest(endpoint: ApiEndpoint, token: string, data: {}) {
        return new Promise<any>((resolve, reject) => {
            unirest
                .post('https://api.my-mc.link/' + endpoint)
                .headers({'Accept': 'application/json', 'Content-Type': 'application/json', 'x-my-mc-auth': token})
                .send(data)
                .then((response: any) => {
                    resolve(response.body);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }
}

export enum ApiEndpoint {
    HELLO = 'hello',
    TIME = 'time',
    STATS = 'stats',
    LOG = 'log',
    START = 'start',
    STOP = 'stop',
    RESTART = 'restart',
    MY_LINK = 'my-link',
    MY_SFTP = 'my-sftp',
    MY_HASH = 'my-hash',
    MY_HASH_SFTP = 'my-hash-sftp',
    LIST_PLAYERS = 'list-players',
    WEBSITE = 'website',
    MAP = 'map',
    BAN = 'ban',
    UNBAN = 'unban',
    SAY = 'say',
    TELL = 'tell',
    CONSOLE = 'console',
    GIVE = 'give',
    INSTALL = 'install',
    UNINSTALL = 'uninstall',
    SEARCH = 'search',
    MOD_LIST = 'mod-list'
}