BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Employees] (
    [ID] NVARCHAR(1000) NOT NULL,
    [FirstName] NVARCHAR(1000) NOT NULL,
    [LastName] NVARCHAR(1000) NOT NULL,
    [Email] NVARCHAR(1000) NOT NULL,
    [Salary] FLOAT(53) NOT NULL,
    [DepartmentID] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Employees_pkey] PRIMARY KEY CLUSTERED ([ID]),
    CONSTRAINT [Employees_Email_key] UNIQUE NONCLUSTERED ([Email])
);

-- CreateTable
CREATE TABLE [dbo].[Department] (
    [ID] NVARCHAR(1000) NOT NULL,
    [DepartmentName] NVARCHAR(1000) NOT NULL,
    [Location] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Department_pkey] PRIMARY KEY CLUSTERED ([ID]),
    CONSTRAINT [Department_DepartmentName_key] UNIQUE NONCLUSTERED ([DepartmentName])
);

-- AddForeignKey
ALTER TABLE [dbo].[Employees] ADD CONSTRAINT [Employees_DepartmentID_fkey] FOREIGN KEY ([DepartmentID]) REFERENCES [dbo].[Department]([ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
