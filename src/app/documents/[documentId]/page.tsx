
import  Editor  from "./editor";

interface DocumentIdPageProps {
  params: Promise <{documentId : string}>;

};

const DocumentIdPage = async ({ params}: DocumentIdPageProps) => {
  const {documentId} = await params;

  return (
    <div className=" size-full overflow-x-auto bg-[#F9FBFD] px-4 print: p-0 print:bg-white print: overflow-visible">
     <div className="min-w-max flex justify-center w-[816px] py-4 print: p-0 mx-auto print:w-full print:min-w-0">

      <Editor />

      </div>
    </div>
  )
}

export default DocumentIdPage;