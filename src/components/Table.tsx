import { ReactElement, ReactNode } from "react";

type Rows = ReactElement<RowProps>[] | ReactElement<RowProps>;
type Cells = ReactElement<CellProps>[] | ReactElement<CellProps>;

interface TableProps {
    headers: string[],
    children?: ReactNode,
    full?: boolean,
    bodyCss?: string
}

export function Table(props: TableProps) {
    return (
        <div className="overflow-x-auto shadow-md rounded-lg border border-slate-700" >
            <table className={(props.full ? "w-full" : "") + ""}>
                <thead className="uppercase bg-slate-900 ">
                    <tr>
                        {props.headers.map(header => (
                            <th scope="col" className="py-3 px-3 md:px-6">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={props.bodyCss}>
                    {props.children}
                </tbody>
            </table>
        </div>
    );
}

interface RowProps {
    children?: Cells,
}

export function Row(props: RowProps) {
    return (
        <tr className="border-t border-slate-700 even:bg-slate-900">
            {props.children}
        </tr>
    );
}

interface CellProps {
    children?: ReactNode
}

export function Cell(props: CellProps) {
    return (
        <td className="py-3 px-3 md:px-6">
            {props.children}
        </td>
    );
}