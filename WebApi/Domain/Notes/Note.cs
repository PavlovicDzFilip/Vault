using Vault.Common.Domain;

namespace Vault.WebApi.Domain.Notes;

public class Note : AggregateRoot<NoteId>
{
    private Note(NoteId id, NoteTitle title, NoteContent content) : base(id)
    {
        Title = title;
        Content = content;
    }

    public NoteTitle Title { get; private set; }
    public NoteContent Content { get; private set; }
    
    public static Note Create(NoteTitle title, NoteContent content)
    {
        return new Note(NoteId.NewId(), title, content);
    }

    public void Update(NoteTitle title, NoteContent content)
    {
        Title = title;
        Content = content;
    }
}
