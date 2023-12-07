export default function layout(props: {
  children: React.ReactNode;
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="">
      {props.children}
      {props.left}
      {props.right}
    </div>
  );
}
