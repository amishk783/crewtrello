import React, { useState } from "react";

import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";

import { useBoard } from "../providers/BoardProvider";
import { ListType } from "../../../typings";

import { List } from "./List";
import { updateCard } from "../_utils/api/card";

interface KanbanboardType {}

const Kanbanboard: React.FC<KanbanboardType> = ({}) => {
  const { currentBoard, setBoardState } = useBoard();
  const handleTaskForm = () => {};
  const handleOnDragEnd = async (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (type === "column") {
      const entries = Array.from(currentBoard.lists);
      const [movedColumn] = entries.splice(source.index, 1);
      console.log("🚀 ~ handleOnDragEnd ~ removed:", movedColumn);
      entries.splice(destination.index, 0, movedColumn);
      const updatedColumns = entries.map((col, index) => ({
        ...col,
        position: index,
      }));

      const rearrangedColumns = new Map(updatedColumns);

      setBoardState({ ...currentBoard, lists: rearrangedColumns });
    } else {
      const columns = Array.from(currentBoard.lists);
      const startColIndex = columns[Number(source.droppableId)];

      const finishColIndex = columns[Number(destination.droppableId)];

      const startCol: ListType = {
        _id: startColIndex[0],
        cards: startColIndex[1].cards,
        name: startColIndex[1].name,
      };

      const finishCol: ListType = {
        _id: finishColIndex[0],
        cards: finishColIndex[1].cards,
        name: finishColIndex[1].name,
      };

      if (!startCol || !finishCol) return;

      if (source.index === destination.index && startCol._id === finishCol._id)
        return;

      const newCards = startCol.cards;
      const [cardMoved] = newCards.splice(source.index, 1);

      if (startCol._id === finishCol._id) {
        newCards.splice(destination.index, 0, cardMoved);
        const newCol = {
          ...startCol,
          cards: newCards,
        };
        const newColumns = new Map(currentBoard.lists);
        newColumns.set(startCol._id, newCol);
        setBoardState({ ...currentBoard, lists: newColumns });
      } else {
        const finishCards = Array.from(finishCol.cards);

        finishCards.splice(destination.index, 0, cardMoved);

        const newColumns = new Map(currentBoard.lists);
        const newCol = {
          ...startCol,
          cards: newCards,
        };
        newColumns.set(startCol._id, newCol);
        newColumns.set(finishCol._id, {
          ...finishCol,
          cards: finishCards,
        });
        console.log(cardMoved);
        const cardData = {
          ...cardMoved,
          listId: finishCol._id,
        };
        const response = await updateCard(cardData);

        setBoardState({ ...currentBoard, lists: newColumns });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex overflow-x-auto overflow-y-auto   gap-4 w-full rounded-lg bg-white pb-10 "
          >
            {Array.from(currentBoard.lists.values()).map((item, index) => (
              <div key={item._id}>
                <List
                  key={item._id}
                  id={item._id}
                  cards={item.cards}
                  title={item.name}
                  index={index}
                  position={item.position}
                  handleTaskForm={handleTaskForm}
                />
              </div>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Kanbanboard;
