import { Expression } from "../expressions/Expression";
import { ExpressionContext } from "../expressions/ExpressionContext";
import { NodeType } from "../expressions/NodeType";

export abstract class ExpressionNodeBase<T extends NodeType>
  implements Expression<T>
{
  constructor(public readonly type: T) {}

  public abstract build(
    ctx: ExpressionContext,
    parent?: Expression<NodeType>
  ): string;

  protected format(
    ctx: ExpressionContext,
    parts: (string | Expression)[],
    {
      separator = "",
      wrap = false,
    }: { separator?: string; wrap?: boolean } = {}
  ): string {
    const expr = parts
      .map((x) => (typeof x === "string" ? x : x.build(ctx, this)))
      .join(separator);

    return wrap ? `(${expr})` : expr;
  }
}
