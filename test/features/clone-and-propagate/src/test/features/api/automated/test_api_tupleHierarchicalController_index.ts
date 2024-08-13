import type { IPropagation } from "@nestia/fetcher";
import typia from "typia";

import api from "../../../../api";
import type { ArrayTupleHierarchical } from "../../../../api/structures/ArrayTupleHierarchical";

export const test_api_tupleHierarchicalController_index = async (
  connection: api.IConnection,
) => {
  const output: IPropagation<
    {
      200: ArrayTupleHierarchical;
    },
    200
  > = await api.functional.tupleHierarchicalController.index(connection);
  typia.assert(output);
};
