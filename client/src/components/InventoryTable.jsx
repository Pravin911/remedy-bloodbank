import React from 'react';
import { GetInventoryWithFilters } from '../apis/inventory';
import { useDispatch } from 'react-redux';
import { getDateFormat } from '../utils/helpers';
import { Table, message } from 'antd';
import { SetLoading } from '../redux/loadersSlice';

function InventoryTable({ filters, userType, limit }) {
  const [data, setData] = React.useState([]);
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Inventory Type",
      dataIndex: "inventoryType",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Blood Group",
      dataIndex: "bloodGroup",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (text) => text + " ML",
    },
    {
      title: "Reference",
      dataIndex: "reference",
      render: (text, record) => {
        if (userType === "organization") {
          return record.inventoryType === "in"
            ? record.donar?.name
            : record.hospital?.hospitalName;
        } else {
          return record.organization.organizationName;
        }
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (text) => getDateFormat(text),
    },
  ];

  // Adjust columns for hospital or donor
  if (userType !== "organization") {
    columns.splice(0, 1); // Remove "Inventory Type" column
    columns[2].title = "Organization Name"; // Update reference column title
    columns[3].title = userType === "hospital" ? "Taken Date" : "Donated Date"; // Update date column title
  }

  const getData = React.useCallback(async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetInventoryWithFilters(filters, limit);
      dispatch(SetLoading(false));
      if (response.success) {
        setData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  }, [dispatch, filters, limit]);

  React.useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div>
      <Table columns={columns} dataSource={data} className="mt-3" />
    </div>
  );
}

export default InventoryTable;
