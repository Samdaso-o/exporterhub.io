import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import CardExporter from "./CardExporter";
import EditModal from "../Modal/EditModal";
// import LoadingModal from "../Modal/LoadingModal";
import APIInputModal from "../Modal/APIInputModal";

const ContentExporters = ({ exporters }) => {
  const {
    push,
    location: { pathname }
  } = useHistory();
  const [isModalActive, setIsModalActive] = useState(false);
  const [exporterId, setExporterId] = useState();

  const goToDetail = id => {
    push(`/detail/${id}`);
  };
  const modalClick = id => {
    setIsModalActive(true);
    setExporterId(id);
  };
  const cancleModal = () => {
    setIsModalActive(false);
  };

  return (
    <ExporterContainer>
      {exporters ? (
        exporters &&
        exporters.map(exporter => (
          <CardExporter
            key={exporter.exporter_id}
            exporter={exporter}
            cardClick={pathname === "/" ? goToDetail : modalClick}
          />
        ))
      ) : (
        <APIInputModal />
      )}
      {isModalActive && (
        <EditModal exporterId={exporterId} cancleModal={cancleModal} />
      )}
    </ExporterContainer>
  );
};

const ExporterContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: ${({ theme }) => (theme.width.content - theme.width.card) * 1.5}px;
  @media ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    flex-wrap: nowrap;
    width: 100%;
  }
`;
export default ContentExporters;
