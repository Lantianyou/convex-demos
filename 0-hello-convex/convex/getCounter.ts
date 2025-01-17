import { query } from "convex-dev/server";

export default query(async ({ db }): Promise<number> => {
  let counterDoc = await db.table("counter_table").first();
  console.log("Got stuff");
  if (counterDoc === null) {
    return 0;
  }
  return counterDoc.counter;
});
