import withOSSFile from "@common/hocs/withOSSFile";

const File = withOSSFile(({ data, children, ...props }) => {
  return children({ url: data, ...props });
});

export default File;
