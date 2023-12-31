import './node_modules/types-mediawiki/index.d.ts';

export {};

declare global {
    interface Window {
        Tooltip: (ele: HTMLElement | JQuery<HTMLElement>, opts: {placement: 'top' | 'bottom' | 'left' | 'right', title: string}) => void;
    }

    namespace rs {
        function addCommas(num: number): string;
        function parseTemplate(template: string, text: string);
        function parseExchangeModule(text: string);
        function crossDomain(url: string, via: string);
        function withOOUIWindowManager();
        function createOOUIWindow(name: string, title: string, winconfig: object, init: () => void, openNow: boolean);
        function canSendBrowserNotifs(): boolean;
        function sendBrowserNotif(title: string, opts: NotificationOptions): Notification | null;
        function hasLocalStorage(): boolean;
        function isUsingDarkmode(): boolean;
        function qsp(name: string, url: string);
        function getFileURLCached(filename: string): string;
        function isUsingStickyHeader(): boolean;
    }
}