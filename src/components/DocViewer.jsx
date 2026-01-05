const DocViewer = ({ docs }) => {
  return (
    <div>
      <h4 className="font-semibold mb-2">Documentation</h4>

      <ul className="space-y-2">
        {docs.map((doc, index) => (
          <li key={index}>
            <a
              href={doc.url}
              target="_blank"
              rel="noreferrer"
              className="text-orange-600 hover:underline"
            >
              {doc.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocViewer;
