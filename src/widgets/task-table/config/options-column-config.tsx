import { ProColumnsConfig } from "./types";
import { DeleteButton, EditButton, FavoriteButton } from "../ui";

export const optionsColumnConfig: ProColumnsConfig = () => ({
  valueType: "option",
  width: 80,
  key: "option",
  render: (_text, record, _, action) => [
    <EditButton key={`edit-button-${record.id}`} id={record.id} action={action} />,
    <DeleteButton key={`delete-button-${record.id}`} id={record.id} />,
    <FavoriteButton key={`favorite-button-${record.id}`} id={record.id} />,
  ],
});
