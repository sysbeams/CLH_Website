// next-sitemap.js
module.exports = {
    siteUrl: 'https://clh.netlify.app/',
    generateRobotsTxt: true,
    transform: (config, path) => {
        let priority;
        let changefreq = 'monthly'; // Default change frequency

        switch (path) {
            case '/':
                priority = 1.0;
                break;
            case '/courses':
                priority = 0.8;
                break;
            case '/about':
                priority = 0.7;
                break;
            case '/contact':
                priority = 0.6;
                break;
            default:
                priority = 0.5; // Default priority for other pages
                break;
        }

        return {
            loc: path,
            priority: priority,
            changefreq: changefreq,
        };
    },
};
