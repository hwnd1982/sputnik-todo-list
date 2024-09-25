import { useEffect, useRef } from "react";
import { useAppStore } from "../../../../app";
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { RedLink } from "../red-link";

export  function FavoriteButton({id}: { id: number }) {
  const { favorite, deleteFavorite, addFavorite } = useAppStore.getState();
  const favoriteRef = useRef(useAppStore(state => state.favorite));
  const onClick = () => {
    if (favorite.list.includes(id)) {
      deleteFavorite(id);
    } else {
      addFavorite(id)
    }
  }

  useEffect(() => {
    useAppStore.subscribe((state) => (favoriteRef.current = state.favorite));
  }, [])

  return (
    <RedLink
      onClick={onClick}
    >
      {favorite.list.includes(id) ? <HeartFilled /> : <HeartOutlined /> }
    </RedLink>
  )
}