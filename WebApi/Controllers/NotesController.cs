using Microsoft.AspNetCore.Mvc;
using Vault.WebApi.Domain.Notes;

namespace Vault.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
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

    public record NoteListItem(long Id, string Title, DateTime LastModifiedAt);
    public record CreateNoteDto(string Title, string Content);
    public record UpdateNoteDto(string Title, string Content);
}