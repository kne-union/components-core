import style from "./style.module.scss";
import { Col, Row, Segmented, Select, Space, Typography } from "antd";
import FileType from "@kne/react-file-type";
import last from "lodash/last";
import dayjs from "dayjs";
import Icon from "@components/Icon";
import { OptionButtons } from "@components/File";
import { FormattedMessage } from "@components/Intl";

const Title = ({
  currentTab,
  setCurrentTab,
  previewMap,
  previewList,
  getPermission,
  currentPreviewFileId,
  setCurrentPreviewFileId,
  itemApis,
  children,
  maxWidth,
  getPopupContainer,
}) => {
  return (
    <div className={style["file-list-title"]}>
      <Row align="middle" justify="space-between" wrap={false}>
        <Col>
          <Space className={style["title-group"]} size={4}>
            <Segmented
              value={currentTab}
              onChange={setCurrentTab}
              options={[
                {
                  label: (
                    <Space size={4}>
                      <Icon type="icon-shitu-liebiao" />
                      <FormattedMessage id="listText" moduleName="FileList" />
                    </Space>
                  ),
                  value: "list",
                },
                {
                  label: (
                    <Space size={4}>
                      <Icon type="icon-shitu-yulan" />
                      <FormattedMessage
                        id="previewText"
                        moduleName="FileList"
                      />
                    </Space>
                  ),
                  value: "preview",
                },
              ]}
            />
            {currentTab === "preview" &&
              currentPreviewFileId &&
              previewMap.get(currentPreviewFileId) && (
                <>
                  <Select
                    className={style["file-select"]}
                    variant="borderless"
                    popupMatchSelectWidth={false}
                    value={currentPreviewFileId}
                    onChange={setCurrentPreviewFileId}
                    getPopupContainer={getPopupContainer}
                  >
                    {previewList.map(({ filename, userName, date, id }) => {
                      return (
                        <Select.Option
                          className={style["file-select-option"]}
                          key={id}
                          value={id}
                        >
                          <Space direction="vertical">
                            <Space size={4} align="start">
                              <FileType
                                type={last(filename.split("."))}
                                size={14}
                              ></FileType>
                              <Typography.Text
                                className={style["file-name"]}
                                ellipsis
                                style={{ "--max-width": `${maxWidth}px` }}
                              >
                                {filename}
                              </Typography.Text>
                            </Space>
                            {userName || date ? (
                              <Space
                                className={style["file-select-info"]}
                                size={24}
                              >
                                <div>
                                  <FormattedMessage
                                    id="uploadUser"
                                    moduleName="FileList"
                                  />
                                  :{userName}
                                </div>
                                <div>
                                  <FormattedMessage
                                    id="uploadTime"
                                    moduleName="FileList"
                                  />
                                  :
                                  {date &&
                                    dayjs(date).format("YYYY-MM-DD HH:mm:ss")}
                                </div>
                              </Space>
                            ) : null}
                          </Space>
                        </Select.Option>
                      );
                    })}
                  </Select>
                  <OptionButtons
                    hasPreview={false}
                    getPermission={getPermission}
                    item={previewMap.get(currentPreviewFileId)}
                    apis={itemApis}
                  />
                  <div className={style["total-count"]}>
                    <FormattedMessage
                      id="totalCount"
                      values={{ count: previewList.length }}
                      moduleName="FileList"
                    />
                  </div>
                </>
              )}
          </Space>
        </Col>
        <Col>{children}</Col>
      </Row>
    </div>
  );
};

Title.defaultProps = {
  maxWidth: 260,
};

export default Title;
