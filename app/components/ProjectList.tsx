import { ProjectListProps } from "../types/types";
export default function ProjectList(props: ProjectListProps) {
    const title = props.title;
    const child = props.child;
    return (
        <ul className="pt-4">
            <li># {title}</li>
            <ul className="pl-4">
                {child.map((c, i) => <li className="pt-1" key={i}>{c}</li>)}
            </ul>
        </ul>
    )
};
