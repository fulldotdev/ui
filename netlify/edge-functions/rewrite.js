export default async (request, context) => {
    const path = context.geo?.country?.code === 'AU' ? '/edge/australia' : '/edge/not-australia';
    return Response.redirect(new URL(path, request.url));
};

export const config = {
    path: '/edge'
};
