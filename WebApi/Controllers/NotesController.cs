using Microsoft.AspNetCore.Mvc;
using Vault.WebApi.Domain.Notes;

namespace Vault.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotesController(NoteRepository noteRepository)
    : ControllerBase
{
    [HttpGet]
    public async Task<IEnumerable<NoteListItem>> Get(CancellationToken cancellationToken)
    {
        var notes = await noteRepository.GetAll(cancellationToken);

        var noteDtos = notes
            .Select(note => new NoteListItem(note.Id, note.Title, note.ModifiedAt))
            .ToList();

        return noteDtos;
    }
    
    [HttpGet("{id}")]
    public async Task<NoteDto> Get(long id, CancellationToken cancellationToken)
    {
        var noteId = NoteId.Parse(id);
        var note = await noteRepository.Get(noteId, cancellationToken);

        return new NoteDto(note.Id, note.Title.Value, note.Content.Value, note.ModifiedAt);
    }

    [HttpPost]
    public long Create(CreateNoteDto createNoteDto)
    {
        var note = Note.Create(
            new NoteTitle(createNoteDto.Title),
            new NoteContent(createNoteDto.Content));

        noteRepository.Add(note);

        return note.Id;
    }

    [HttpPut("{id}")]
    public async Task Update(long id, UpdateNoteDto updateNoteDto, CancellationToken cancellationToken)
    {
        var noteId = NoteId.Parse(id);
        var note = await noteRepository.Get(noteId, cancellationToken);

        note.Update(
            new NoteTitle(updateNoteDto.Title),
            new NoteContent(updateNoteDto.Content));

        noteRepository.Update(note);
    }

    [HttpDelete("{id}")]
    public async Task Delete(long id, CancellationToken cancellationToken)
    {
        var noteId = NoteId.Parse(id);
        var note = await noteRepository.Get(noteId, cancellationToken);
        noteRepository.Remove(note);
    }

    public record NoteListItem(long Id, string Title, DateTime ModifiedAt);

    public record CreateNoteDto(string Title, string Content);

    public record UpdateNoteDto(string Title, string Content);
    
    public record NoteDto(long Id, string Title, string Content, DateTime ModifiedAt);
}
