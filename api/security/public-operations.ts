const publicOperations = new Set([
 'brandStudio.inquire','studioPayments.configuration','studioPayments.checkout','studioPayments.status','design.landing',
 'visitor.status','visitor.enter','engagement.unsubscribe','courses.enroll','feed.list','feed.getById','blog.list','ping',
]);
export function isUnauthenticatedOperation(operation:string){
 return publicOperations.has(operation)||operation.startsWith('auth.')||operation.startsWith('stripe.webhook');
}
