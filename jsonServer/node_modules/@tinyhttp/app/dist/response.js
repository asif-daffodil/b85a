export const renderTemplate = (_req, res, app) => (file, data, options) => {
    app.render(file, data ? { ...res.locals, ...data } : res.locals, options, (err, html) => {
        if (err)
            throw err;
        res.send(html);
    });
    return res;
};
//# sourceMappingURL=response.js.map