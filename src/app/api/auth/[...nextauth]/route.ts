// [] 다이나믹 라우팅할때 slug인데 [...folderName] 은 Catch-all Router 입니다.
/**
 * 어떤거든지 다 들어갈수 있다
 * Route                        Example URL       params
 * app/shop/[...slug]/page.js  /shop/a          {slug: ['a']}
 * app/shop/[...slug]/page.js  /shop/a/b        {slug: ['a','b']}
 * app/shop/[...slug]/page.js  /shop/a/b/       {slug: ['a','b','c']}
 *
 *
 * GET /api/auth/a;
 * GET /api/auth/b;
 *
 */
export { GET, POST } from "@/auth";
