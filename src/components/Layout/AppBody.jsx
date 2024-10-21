import { Card } from "antd";
import PageHeading from "../PageHeading";

function AppBody(props) {
  return (
    <>
        <PageHeading heading={props.heading} />
        <Card title={props.title} extra={props.extra} style={{ width: '100%', marginTop:"50px", minHeight:"70vh" }}>
            {props.children}
        </Card>
    </>
  );
}

export default AppBody;