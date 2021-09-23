import { ListPreview } from './list-preview';

export const ListAll = props => {
  const { lists, onAddingCard, addingCardToList } = props;
  return (
    <section className="list-all flex">
      {lists.map(list => (
        <ListPreview
          key={list._id}
          list={list}
          isAddingCard={addingCardToList === list._id}
          onAddingCard={onAddingCard}
        />
      ))}
    </section>
  );
};
