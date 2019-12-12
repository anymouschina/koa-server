export default function log() {
    return async (ctx: KoaContext, next: Function) => {
      console.log(ctx);
      next()
    };
}
