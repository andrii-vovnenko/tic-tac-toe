const CellComponent = ({ action, value }) => {
  return (
    <span onClick={action} style={{
      width: '89px',
      height: '89px',
      border: '1px solid lightgray',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 'xxx-large',
      textTransform: 'capitalize',
      cursor: 'pointer',
      fontWeight: 900,
    }}>
      {value}
    </span>
  )
};

export default CellComponent;