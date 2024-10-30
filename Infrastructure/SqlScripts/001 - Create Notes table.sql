CREATE TABLE [dbo].[Notes](
    [Id] [bigint] NOT NULL,
    [CreatedAt] [datetime2](7) NOT NULL,
    [ModifiedAt] [datetime2](7) NOT NULL,
    [Title] [nvarchar](200) NOT NULL,
    [Content] [nvarchar](MAX) NOT NULL,
PRIMARY KEY CLUSTERED([Id] ASC))
