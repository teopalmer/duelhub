import Avatar from "@/components/shared/Avatar";
import styles from "../gameListModal.module.css";
import { GameType } from "@/requests/games";
interface GameItemProp {
  game: GameType;
  checked: boolean;
  onChange: () => void;
}

function GameItem({ game, onChange, checked }: GameItemProp) {
  return (
    <li>
      <input
        type="radio"
        className={`hidden ${styles.gamePickRadio}`}
        name="game-pick-radio"
        value={game.id}
        id={`game-pick-radio-${game.id}`}
        checked={checked}
        onChange={onChange}
      />
      <label
        htmlFor={`game-pick-radio-${game.id}`}
        className="flex gap-3 w-[197px] p-[11px] rounded-[10px] border border-solid border-[#1E1F22] cursor-pointer hover:border-[#2F88FF] transition"
      >
        <div className="w-[34px] h-[34px] rounded-[10px] items-center">
          <Avatar src={game.img} type="image" isOnline={false} size="default" />
        </div>
        <span className="text text-sm text-white leading-[34px]">
          {game.name}
        </span>
      </label>
    </li>
  );
}

export default GameItem;
