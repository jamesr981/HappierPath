interface InfoProps {
  url: URL | null;
}

const Info = ({ url }: InfoProps) => {
  return (
    <div id="info">
      <p>
        <em>Protocol:</em>{' '}
        <span id="protocol">{url?.protocol.replace(':', '')}</span>
      </p>
      <p>
        <em>Host:</em> <span id="host">{url?.hostname}</span>
      </p>
      <p>
        <em>Port:</em> <span id="port">{url?.port}</span>
      </p>
      <p>
        <em>Path:</em> <span id="path">{url?.pathname}</span>
      </p>
      <p>
        <em>Query:</em> <span id="query">{url?.search}</span>
      </p>
    </div>
  );
};

export default Info;
