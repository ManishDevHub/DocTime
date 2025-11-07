
interface DocumentIdPageProps {
  params: Promise <{documentId : string}>;

};

const DocumentIdPage = async ({ params}: DocumentIdPageProps) => {
  const {documentId} = await params;

  return (
    <div>
      Documnet ID : {documentId}
    </div>
  )
}

export default DocumentIdPage;